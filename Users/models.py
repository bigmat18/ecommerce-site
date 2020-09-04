from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from Shop.models import Item
from Core.utils import generate_random_string

class CustomUser(AbstractUser):
    avatar = models.ImageField(null=True, blank=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class ItemCart(models.Model):
    user = models.ForeignKey(CustomUser,
                            on_delete=models.CASCADE,
                            related_name="items")
    item = models.ForeignKey(Item,
                            on_delete=models.CASCADE,
                            related_name="cart")
    number = models.IntegerField(default=1)

    def __str__(self):
        return self.item.title
        
    class Meta:
        verbose_name = "ItemCart"
        verbose_name_plural = "ItemCarts"