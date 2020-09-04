from rest_framework import generics
from Core.api.serializers import StarSerializers
from Core.models import Star

class StarListView(generics.ListAPIView):
    serializer_class = StarSerializers
    queryset = Star.objects.all()

