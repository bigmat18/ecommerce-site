from django.contrib import admin
from .models import Item, ItemReview, ItemVote
# Register your models here.

admin.site.register(Item)
admin.site.register(ItemReview)
admin.site.register(ItemVote)