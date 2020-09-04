from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, ItemCart
from django.contrib.auth.models import Group
# Register your models here.

class CustumUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ["username", "email", "is_staff"]

admin.site.register(CustomUser, CustumUserAdmin)
admin.site.register(ItemCart)
admin.site.unregister(Group)