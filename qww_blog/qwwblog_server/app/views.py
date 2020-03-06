import json
from app.models import user, healthyCondition
from django.http import HttpResponse
from django.db.models import Max
from django.db.models import Q
from django.shortcuts import render
from django.db.models import Sum
# Create your views here.
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        loginUsername = data['username']
        loginPassword = data['pwd']
        try:
            result = user.objects.get(username=loginUsername)
            if result.password == loginPassword:
                res = {'data': loginUsername, 'message': '登录成功！','err_code':'100','auth':result.authorization}
                return HttpResponse(json.dumps(res), content_type='application/json')
            else:
                res = {'data': loginUsername, 'message': '密码错误！请重试。','err_code':'200'}
                return HttpResponse(json.dumps(res), content_type='application/json')
        except:
            res = {'data': loginUsername, 'message': '该用户名不存在！请注册','err_code':'400'}
            return HttpResponse(json.dumps(res), content_type='application/json')


def register(request):
    userInfo = user()
    if request.method == 'POST':
        data = json.loads(request.body)
        new_userName = data['username']
        new_passWord = data['pwd']
        new_sex = data['sex']
        new_userAge = data['userage']
        new_userTel = data['usertel']
        new_email = data['email']
        new_authorization = data['authorization']
        try:
            result = user.objects.get(username=new_userName)
            res = {'data':new_userName,'message':'该用户名已存在，不得重复！','err_code':'201'}
            return HttpResponse(json.dumps(res),content_type='application/json')
        except:
            userInfo.username = new_userName
            userInfo.password = new_passWord
            userInfo.sex = new_sex
            userInfo.userage = new_userAge
            userInfo.usertel = new_userTel
            userInfo.email = new_email
            userInfo.authorization = new_authorization
            userInfo.save()
            res = {'data': new_userName, 'message': '账号%s 注册成功'%new_userName,'err_code':'101'}
            return HttpResponse(json.dumps(res),content_type='application/json')

# def frontpage(request):
#     return None
#
# def writeblog(request):
#     return None
#
# def comment(request):
#     return None


def declaration(request):
    usercondition = healthyCondition()
    userInfo = user()
    if request.method == 'POST':
        data = json.loads(request.body)
        applyUsername = data['username']
        applyCondition = data['condition']
        applyTemperature = data['temperature']
        applyPosition = data['position']
        try:
            result = user.objects.get(username=applyUsername)
            applyUserid = result.userid
            usercondition.userid_id = applyUserid
            usercondition.condition = applyCondition
            usercondition.temperature = applyTemperature
            usercondition.position = applyPosition
            usercondition.save()
            result2 = healthyCondition.objects.all().aggregate(Max('id'))
            idddd = result2['id__max']
            result3 = healthyCondition.objects.get(id=idddd)
            healthyCondition.objects.filter(Q(date=result3.date)&~Q(pk=idddd)).delete()
            res = {'data':applyUsername,'message':'健康信息申报成功','err_code':'150'}
            return HttpResponse(json.dumps(res),content_type='application/json')
        except:
            res = {'data':applyUsername,'message':'该用户不存在，请先注册','err_code':'400'}
            return HttpResponse(json.dumps(res), content_type='application/json')


def userinformation(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        queryUser = data['username']
        try:
            result = user.objects.get(username=queryUser)
            res = {
                'data':{
                    'userid': result.userid,
                    'username': queryUser,
                    'usersex': result.sex,
                    'userage': result.userage,
                    'usertel': result.usertel,
                    'email': result.email,
                    'registertime': str(result.registertime),
                },
                'message': '信息查询成功',
                'err_code': '160'
            }
            return HttpResponse(json.dumps(res), content_type='application/json')
        except:
            res = {'data':queryUser,'message':'该用户不存在','err_code':'400'}
            return HttpResponse(json.dumps(res),content_type='application/json')


def usercondition(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        queryUser = data['username']
        try:
            result1 = user.objects.get(username=queryUser)
            result2 = healthyCondition.objects.all().filter(userid_id=result1.userid)
            res = []
            res2 = {}
            for i in result2:
                a = {
                    'data':{
                        'condition':i.condition,
                        'temperature':str(i.temperature),
                        'position':str(i.position),
                        'date':str(i.date)
                    },
                }
                res.append(a)
            res2.update({'data':res,'message':'数据获取成功','err_code':170})
            return HttpResponse(json.dumps(res2), content_type='application/json')
        except:
            res = {'data': queryUser, 'message': '用户名信息不存在', 'err_code': '404'}
            return HttpResponse(json.dumps(res), content_type='application/json')


def statistics(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        date = data['date']
        s_date = str(date)
        newDate = s_date[:10]
        print('日期：',newDate)
        res = []
        sum1 = 0
        sum2 = 0
        sum3 = 0
        sum4 = 0
        sum5 = 0
        sum6 = 0
        sum7 = 0
        sum8 = 0
        try:
            result = healthyCondition.objects.filter(date=newDate)
            for i in result:
                aaa = i.temperature
                if aaa<=36.5:
                    sum1 += 1
                elif aaa>=36.6 and aaa<=36.9:
                    sum2 +=1
                elif aaa>=37.0 and aaa<=37.3:
                    sum3 +=1
                elif aaa>=37.4 and aaa<=37.7:
                    sum4 +=1
                elif aaa>=37.8 and aaa<=38.1:
                    sum5 +=1
                elif aaa>=38.2 and aaa<=38.5:
                    sum6 +=1
                elif aaa>=38.6 and aaa<=38.9:
                    sum7 +=1
                else:
                    sum8 +=1
            res = [sum1, sum2, sum3, sum4, sum5, sum6, sum7, sum8]
            res2 = {'data':res,'message':'体温信息获取成功','err_code':'105' }
            return HttpResponse(json.dumps(res2), content_type='application/json')
        except:
            res = {'data': [], 'message': '无体温信息', 'err_code': '405'}
            return HttpResponse(json.dumps(res), content_type='application/json')


def userinfo(request):
    res = []
    if request.method == 'GET':
        result = user.objects.all().values_list()
        for i in result:
            a = {
                'id':str(i[0]),
                'userid':str(i[0]),
                'username': i[1],
                'usersex': i[3],
                'userage': i[4],
                'usertel': i[5],
                'email': i[6],
                'authorization': i[8],
            }
            res.append(a)
    sss = {'data':res,'message':'获取信息成功','err_code':'106'}
    return HttpResponse(json.dumps(sss), content_type='application/json')


def infoupdate(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        try:
            user.objects.filter(userid=data['userid']).update(username=data['username'],userage=data['userage'],sex=data['usersex'],usertel=data['usertel'],email=data['email'],authorization=data['authorization'])
            res = {'data': '', 'message': '用户信息更改成功', 'err_code': '66'}
            return HttpResponse(json.dumps(res), content_type='application/json')
        except:
            res = {'data': '', 'message': '未知错误', 'err_code': '44'}
            return HttpResponse(json.dumps(res), content_type='application/json')