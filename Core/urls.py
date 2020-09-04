from django.urls import path
from Core import views as vs

urlpatterns = [
    path("", vs.homepageView, name="homepage"),
    path("login/", vs.loginView, name="login"),
    path("registration/", vs.registrationView, name="registration"),
    path("detail/", vs.detailItemView, name="detail-item"),
    path("account/", vs.accountView, name="account"),
    path("cart/", vs.cartView, name="cart"),
]
