from django.urls import path
from Users.api.views import (CurrentUserApiView, 
                            CartUserListCreateView, 
                            CartItemRemoveView,
                            AvatarUpdateAPIView)

urlpatterns = [
    path("user/", CurrentUserApiView.as_view(), name="current-user"),
    path("user/avatar/", AvatarUpdateAPIView.as_view(), name="avatar-update"),
    path("user/cart/", CartUserListCreateView.as_view(), name="cart-user-list"),
    path("user/cart/<int:pk>/", CartItemRemoveView.as_view(), name="cart-item-remove")
]
