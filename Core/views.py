from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.base import TemplateView
from django.conf import settings

from django.shortcuts import render

def homepageView(request):
    return render(request, "index.html")

def loginView(request):
    return render(request, "registration-login/login/login.html")

def registrationView(request):
    return render(request, "registration-login/registration/registration.html")

def detailItemView(request):
    return render(request, "detail.html")

def cartView(request):
    return render(request, "cart.html")

def accountView(request):
    return render(request, "account.html")