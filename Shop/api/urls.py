from django.urls import include, path
from rest_framework.routers import DefaultRouter
from Shop.api import views as qv

router = DefaultRouter()
router.register(r"items", qv.ItemViewSet)

urlpatterns = [
    path("", include(router.urls)),
    
    path("items/<slug:slug>/reviews/", qv.ItemReviewListAPIView.as_view(),
         name="item-reviews-list"),

    path("items/<slug:slug>/votes/", qv.ItemVoteListView.as_view(),
         name="item-votes-list"),
    
    path("items/<slug:slug>/vote/", qv.ItemVoteCreateAPIView.as_view(),
         name="create-vote"),

    path("items/<slug:slug>/image/", qv.ItemImageUpdateAPIView.as_view(),
         name="item-image-update"),
    
    path("items/<slug:slug>/review/", qv.ItemReviewCreateAPIView.as_view(),
         name="create-review"),

    path("reviews/<int:pk>/", qv.ItemReviewRUDAPIView.as_view(),
         name="review-detail"),

    path("votes/<int:pk>/", qv.ItemVoteRUDAPIView.as_view(),
         name="vote-detail"),
        
    path("reviews/<int:pk>/like/", qv.ItemReviewLikeAPIView.as_view(),
         name="review-like"),
]