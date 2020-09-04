from django.urls import include, path
from Core.api.views import StarListView

urlpatterns = [
    path('star/', StarListView.as_view(), name="star-list"),
]