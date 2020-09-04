from rest_framework import serializers
from Core.models import Star

class StarSerializers(serializers.ModelSerializer):
    class Meta:
        model = Star
        fields = "__all__"
