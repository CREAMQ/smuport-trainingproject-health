"""qwwblog_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from app import views
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', views.login),
    path('register',views.register),
    # path('frontpage',views.frontpage),
    # path('writeblog',views.writeblog),
    # path('comment',views.comment)
    path('declaration',views.declaration),
    path('userinformation',views.userinformation),
    path('usercondition',views.usercondition),
    path('statistics',views.statistics),
    path('userinfo',views.userinfo),
    path('infoupdate', views.infoupdate),
]
