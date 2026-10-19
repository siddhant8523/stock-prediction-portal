from accounts import views as UserView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView


urlpatterns=[
    # the base url is api/v1/
    path('register/',UserView.RegisterView.as_view()),

    #JWT Url configuration 
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair '),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh '),

    path('protected-view/',UserView.ProtectedView.as_view())
]

