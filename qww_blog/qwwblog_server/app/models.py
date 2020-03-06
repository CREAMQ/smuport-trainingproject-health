from django.db import models

# Create your models here.
class user(models.Model):
    userid = models.AutoField(primary_key = True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    sex = models.CharField(max_length=6)
    userage = models.IntegerField(default=1)
    usertel = models.CharField(max_length=15,blank=True)
    email = models.CharField(max_length=30,blank=True)
    registertime = models.DateTimeField(auto_now_add=True)
    authorization = models.IntegerField(default=1)  # 权限:普通用户--1  管理员--2

class blog(models.Model):
    blogid = models.AutoField(primary_key = True)
    userid = models.ForeignKey(user,on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    clicks = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)

class comment(models.Model):
    commentid = models.AutoField(primary_key = True)
    blogid = models.ForeignKey(blog,on_delete=models.CASCADE)
    userid = models.ForeignKey(user,on_delete=models.CASCADE)
    commentcontent = models.CharField(max_length=250)
    commenttime = models.DateTimeField(auto_now_add=True)
    commentlikes = models.IntegerField(default=0)

class healthyCondition(models.Model):
    userid = models.ForeignKey('user',on_delete=models.CASCADE)
    condition = models.CharField(max_length=20)
    temperature = models.DecimalField(max_digits=3,decimal_places=1)
    date = models.DateField(auto_now_add=True)
    position = models.CharField(max_length=40)



