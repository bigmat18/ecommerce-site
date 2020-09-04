from rest_framework import serializers
from Shop.models import Item, ItemReview, ItemVote

class ItemSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(read_only=True)

    class Meta:
        model = Item
        exclude = ["updated_at"]
    
    def get_created_at(self, instance):
        return instance.created_at.strftime('%d %B %Y')

class ItemReviewSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)
    item_slug = serializers.SerializerMethodField(read_only=True)
    user_has_voted = serializers.SerializerMethodField(read_only=True)
    likes_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ItemReview
        exclude = ["updated_at", "voters", "item"]
    
    def get_created_at(self, instance):
        return instance.created_at.strftime('%d %B %Y')

    def get_likes_count(self, instance):
        return instance.voters.count()

    def get_user_has_voted(self, instance):
        request = self.context.get("request")
        return instance.voters.filter(pk=request.user.pk).exists()

    def get_item_slug(self, instance):
        return instance.item.slug


class ItemVoteSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    item = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ItemVote
        fields = "__all__"
    
    def get_item_slug(self, instance):
        return instance.item.slug


class ItemImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ["image"]