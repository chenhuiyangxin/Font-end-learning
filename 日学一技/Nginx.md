#Nginx

## Nginx 服务的启停控制

### 信号控制

在Nginx服务的启停办法中，有一类是通过信号机制实现的   

Nginx服务运行时，会保持一个主进程和一个或多个worker process工作进程，我们给主进程发送信号就可以控制启停了    
要给主进程发信号，就要知道主进程的进程号PID

获取PID有两个方法，一个是log目录中会产生文件名为nginx.pid的文件，命令行执行`# cat nginx.pid`即可获得主进程PID    
第二个是利用Linux平台下的进程查看工具ps，执行`# ps -ef | grep nginx`就能看到主进程的PID

Nginx服务能接受的信号有：

*TERM或INT   快速停止服务
*QUIT        平缓停止服务
*HUP         使用心得配置文件启动进程，之后平缓停止原有进程，即平滑重启
*USR1        重新打开日志文件
*USR2        平滑升级
*WINCH       平缓停止worker process，用于Nginx服务器平滑升级

发送信号也有两种方法，一种是使用nginx二进制文件，下一节说明，另外就是使用kill命令，像这样    
`kill SIGNAL PID`  
SIGNAL就是信号名称，PID指主进程PID

### 服务启动

在linux平台下，启动nginx服务器直接运行安装在目录下的sbin目录中的二进制文件即可，像这样    
`# ./sbin/Nginx`

### 服务的停止

停止有两种，一种是快速停止，就是立即停止正在处理的所有网络请求，马上丢弃连接，停止工作。     
还有一种就是平缓停止，就是处理完当前正在处理的网络请求，但不再接受新的请求，之后关闭连接，停止工作