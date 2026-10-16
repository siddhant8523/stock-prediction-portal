from accounts import views as UserView
from django.urls import path
urlpatterns=[
    path('register/',UserView.RegisterView.as_view())
]