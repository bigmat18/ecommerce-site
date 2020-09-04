from rest_framework.exceptions import ValidationError

from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from Users.models import CustomUser

from Shop.models import Item, ItemReview, ItemVote
from Shop.api.serializers import (ItemSerializer, ItemImageSerializer, 
                                ItemReviewSerializer, ItemVoteSerializer,
                                ItemImageSerializer)

from rest_framework.permissions import IsAuthenticated
from Shop.api.permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly
from Shop.api.pagination import SmallSetPagination
from django.shortcuts import get_object_or_404

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('created_at')
    lookup_field = "slug"
    serializer_class = ItemSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = SmallSetPagination

class ItemReviewCreateAPIView(generics.CreateAPIView):
    queryset = ItemReview.objects.all()
    serializer_class = ItemReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        request_user = self.request.user
        kwarg_slug = self.kwargs.get("slug")
        item = get_object_or_404(Item, slug=kwarg_slug)

        if item.reviews.filter(author=request_user).exists():
            raise ValidationError("Hai già recensito questo prodotto")
        serializer.save(author=request_user, item=item)


class ItemReviewListAPIView(generics.ListAPIView):
    serializer_class = ItemReviewSerializer

    def get_queryset(self):
        kwarg_slug = self.kwargs.get("slug")
        return ItemReview.objects.filter(item__slug=kwarg_slug).order_by("-created_at")

class ItemReviewRUDAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ItemReview.objects.all()
    serializer_class = ItemReviewSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]


class ItemReviewLikeAPIView(APIView):
    serializer_class = ItemReviewSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        review = get_object_or_404(ItemReview, pk=pk)
        user = self.request.user

        review.voters.remove(user)
        review.save()

        serializer_context = {"request": request}
        serializer = self.serializer_class(review, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, pk):
        review = get_object_or_404(ItemReview, pk=pk)
        user = self.request.user

        review.voters.add(user)
        review.save()

        serializer_context = {"request": request}
        serializer = self.serializer_class(review, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)

class ItemImageUpdateAPIView(APIView):
    # serializer_class = ItemImageSerializer
    permission_classes = [IsAuthenticated]
    # lookup_field = "slug"
    # parser_classes = (MultiPartParser, FormParser)

    # def get_queryset(self):
    #     kwarg_slug = self.kwargs.get("slug")
    #     return Item.objects.filter(slug=kwarg_slug)

    def put(self, request, slug):
        item = get_object_or_404(Item, slug=slug)
        serializer = ItemImageSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ItemVoteListView(generics.ListAPIView):
    serializer_class = ItemVoteSerializer

    def get_queryset(self):
        kwarg_slug = self.kwargs.get("slug")
        return ItemVote.objects.filter(item__slug=kwarg_slug)

class ItemVoteCreateAPIView(generics.CreateAPIView):
    queryset = ItemVote.objects.all()
    serializer_class = ItemVoteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        request_user = self.request.user
        kwarg_slug = self.kwargs.get("slug")
        item = get_object_or_404(Item, slug=kwarg_slug)

        if item.votes.filter(author=request_user).exists():
            raise ValidationError("Hai già dato un voto al prodotto")
        serializer.save(author=request_user, item=item)

class ItemVoteRUDAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ItemVote.objects.all()
    serializer_class = ItemVoteSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]