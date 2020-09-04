from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError

from rest_framework import generics, status, viewsets, mixins

from rest_framework.response import Response
from rest_framework.views import APIView
from Users.api.serializers import (UserSerialaizer, 
                                    ItemCartSerialaizer,
                                    UserAvatarSerializer)
from Users.models import CustomUser, ItemCart
from rest_framework import viewsets
from Shop.models import Item
from rest_framework.permissions import IsAuthenticated


class CurrentUserApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        user = get_object_or_404(CustomUser, id=id)
        return user

    def get(self, request):
        serializer = UserSerialaizer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        user = self.get_object(request.user.id)
        serializer = UserSerialaizer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CartUserListCreateView(generics.ListAPIView, generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemCartSerialaizer

    def get_queryset(self):
        return ItemCart.objects.filter(user=self.request.user)


class CartItemRemoveView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ItemCartSerialaizer

    def get_queryset(self):
        kwarg_slug = self.kwargs.get("pk")
        return ItemCart.objects.filter(item__id=kwarg_slug)

class AvatarUpdateAPIView(generics.UpdateAPIView, generics.RetrieveAPIView):
    serializer_class = UserAvatarSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile_object = self.request.user
        return profile_object