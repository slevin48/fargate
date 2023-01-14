# fargate
🐋Test serverless deployment of docker containers on AWS Fargate 🚀


1. Download the CLI [fargate.exe](https://github.com/awslabs/fargatecli/releases/) 

```
$ fargate
Deploy serverless containers onto the cloud from your command line

fargate is a command-line interface to deploy containers to AWS Fargate that
makes it easy to run containers in AWS as one-off tasks or managed, highly
available services secured by free TLS certificates. It bundles the power of AWS
including Amazon Elastic Container Service (ECS), Amazon Elastic Container
Registry (ECR), Elastic Load Balancing, AWS Certificate Manager, Amazon
CloudWatch Logs, and Amazon Route 53 into an easy-to-use CLI.

Usage:
  fargate [command]

Available Commands:
  certificate Manage certificates
  help        Help about any command
  lb          Manage load balancers
  service     Manage services
  task        Manage tasks

Flags:
      --cluster string   ECS cluster name (default "fargate")
  -h, --help             help for fargate
      --no-color         Disable color output
      --region string    AWS region (default "us-east-1")
  -v, --verbose          Verbose output
      --version          version for fargate

Use "fargate [command] --help" for more information about a command.
```

2. Run a task from a Docker Hub Image (here nginx)

```
fargate task run nginx --image nginx:latest
```

You may need to add a [security group](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#SecurityGroups:): `--security-group-id`

3. Take a look at the task:
```
fargate task ps nginx
```

```
ID                                      IMAGE           STATUS  RUNNING         IP              CPUMEMORY
318d50f4dac74bb6b44b036f63cf6283        nginx:latest    running 2h11m56s        54.211.60.5     256512
```

4. Connect to the server with curl:
```
curl 54.211.60.5
```

5. Retrieve container logs:
```
fargate task logs nginx
```

```
fargate/nginx/318d50f4dac74bb6b44b036f63cf6283 173.48.63.119 - - [14/Jan/2023:15:09:27 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/7.83.1" "-"
```

Watch the logs continuously with `--follow`

6. Stop the task:
```
fargate task stop nginx
``` 

7. Run a task from a local project:

```
fargate task run app
```
You may need to add a [security group](https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#SecurityGroups:): `--security-group-id`

Also make sure to add an inbound rule to the security group to accept traffic on port 8080.

8. View info:
```
fargate task info app
```
```
Task Group Name: app
Task Instances: 1
  c5886e78b90e46659c89942e919dc5db:
    Image: 884021060667.dkr.ecr.us-east-1.amazonaws.com/app:3e1e20f
    Status: running
    Started At: 2023-01-14 19:08:08 +0000 UTC
    IP: 3.238.134.76
    CPU: 256
    Memory: 512
    Subnet: subnet-1a6fdd16
    Security Groups: sg-69431510
```

9. You can test the newly deployed task:
```
curl 3.238.134.76:8080
```


## resources

- https://github.com/awslabs/fargatecli
- https://www.youtube.com/watch?v=P6iY6ovhbfc