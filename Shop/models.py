from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

class Item(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(null=True, blank=True)
    price = models.FloatField(default=0)
    discountValue = models.IntegerField(validators=[MinValueValidator(0),
                                       MaxValueValidator(100)], default=0)
    slug =  models.SlugField(max_length=255, unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Items"



class ItemReview(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()
    item = models.ForeignKey(Item,
                            on_delete=models.CASCADE,
                            related_name="reviews")
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE,
                                related_name="reviews")
    voters = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                    related_name="likes",
                                    blank=True)

    def __str__(self):
        return self.author.username

    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"


class ItemVote(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE,
                                related_name="votes")
    item = models.ForeignKey(Item,
                            default=None,
                            on_delete=models.CASCADE,
                            related_name="votes")
    vote = models.FloatField(validators=[MinValueValidator(1),
                                       MaxValueValidator(5)])
    
    def __str__(self):
        return "" + self.author.username + str(self.vote)

    class Meta:
        verbose_name = "Vote"
        verbose_name_plural = "Votes"