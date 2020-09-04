from rest_framework import serializers
from Users.models import CustomUser, ItemCart

class UserSerialaizer(serializers.ModelSerializer):
    cart_number_item = serializers.SerializerMethodField(read_only=True)
    avatar = serializers.ImageField(read_only=True)

    class Meta:
        model = CustomUser
        exclude = ["is_active", "is_staff", "groups", "user_permissions", "password"]

    def get_cart_number_item(self, instance):
        return ItemCart.objects.filter(user=instance).count()

    
class ItemCartSerialaizer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ItemCart
        fields = '__all__'

    def get_total_price(self, instace):
        return instace.item.price * instace.number


class UserAvatarSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ["avatar"]