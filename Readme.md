# Design PF Architecture

Hi, I am Ardian Cakolli, a software engineer. In the next lines I'll explain the solutions I have provided to the task provided in this [link](https://www.notion.so/Design-Product-Feedback-architecture-b5eff97ff2ac479cacc337103804ee13#da6527627865478d9762f9c32a9bbe99).

## Architecture Overview

Described in the picture below is my attempt to the PF architecture. Here is the list of questions I had to answer.

1. list of all different services
2. type(s) of server(s) and its architecture
3. type(s) of database(s) and its architecture
4. technologies
5. libraries
6. code architecture and design patterns
7. QA testing & approach
8. other services (CI, code analysis)

![PF Architecture](https://github.com/ardian-c/note-taking-app/blob/master/assets/Product-Feedback-Architecture.png)

## List of all different services

The PF I think would need to use a number of services. In the diagram I have only shown the Segment API Service, Mail Service, Notification Service, Queues.

From the description of the task it says that PF will use another external tool, Segment, to handle the events from the surveys. Thus, a Segment API Service should be available, either as a standalone (microservice) or part of the main NodeJs backend. And as with most of similar products, a stable mail service should be essential. I think PF will need to communicate results or summaries to the surveys to clients, besides having a dashboard for them to login. Fortunately there are a number of solutions that would work well, AWS SES being reasonably cheap, but there are other tools too. I have included also a notification service, in case there are cases where push notifications are required however this might not be required.

## Type(s) of server(s) and its architecture

Regarding servers, I have shown the application servers architecture. Using Docker and then Kubernetes these application servers will easily scale. Further, with Kubernetes this scaling can be made as flexible as needed, thus allowing for best resource management. I'd use AWS EC2 instance either on demand or permanent to deploy the Docker containers. Further, I have shown a load balancer in front of the application servers. This load balancer can be an open source solution (Nginx) or AWS Elastic Load Balancer and will handle large number of requests, by distributing them to different application servers.

## Type(s) of database(s) and its architecture

The database is one of the most important parts of the architecture. In the picture there are a few relational databases with sharding implemented. The sharding will allow for horizontal scaling. One of my biggest doubts was choosing between a relational or NoSQL database. Both of them had their own advantages. Since PF will have clients and they will have surveys, and in term surveys will have results or other related entities attached to them, so I thought these relations can be best expressed using a relational database.  
Since the data will eventually grow a lot and possibly the PostgreSQL databases won't need much of the historic data, I saw a need for a data lake. There are a number of solutions for this, I have only shown AWS Redshift.

## Technologies

With regards to technologies, I have shown them in the application servers. I think NodeJs will be a good choice for this type of project. NodeJs generally works well with high input/output applications that don't do a lot of processing. Hence the backend can be written in NodeJs, and there could be a use case for AWS Serverless (Lambda functions) for some parts of functionality. This can be costly and there is an issue with Lambda functions usage, if they are not used frequently there is the problem of the functions not being ready for a period of time, thus they will work with a bit of latency on the first call. However, there is a workaround for it.
If there is a need for concurrency Elixir also can be used, but I did not found that to be the case.

ReactJs can be the solution for the frontend application, the component based development will allow for code reuse, the immutability, hooks and the state management (Redux) among others are some of its best features. Further, Apollo GraphQL implementation will allow a number of other important features, cache and optimistic updates. This of course assumes that NodeJS has the schema and all what is needed for the GraphQL is implemented. GraphQL in itself will allow PF greater flexibility on data querying, especially with the complicated relations.

## Libraries

ReactJs - Javascript library which can be used to create the frontend of the application.
Redux - State management library for ReactJs.
Apollo GraphQL - The implementation of GraphQL in Javascript.
Express/Fastify - Express provides a more stable solution for the NodeJs backend implementation, however there are other similar frameworks gaining popularity, like Fastify.

There are a lot of packages/libraries for both and frontend, but at the time I cannot predict what can be used or not.

## Code architecture and design patterns

As per code architecture and possible design patterns to implement there are a number of solutions to consider. I would use a Monolith application but with a number of modular components/services inside it, so if there is a need in the future for them to be separated that can be done with relative ease. The architecture I have shown in the picture above, is more a monolith in the sense it has a number of layers communicating with each other. I think this would work well with PF as it is easier to understand and implement, further it can scale too.
Obviously the Microservices architecture would work best in the case when these components/services would require scaling as they can be deployed on their own. However, I think Microservices have a lot of complexity in order to be implemented well, and quite often this introduces more problems thus making development slower.
As far as design patterns, depending on uses cases we can use a few of them, Singleton pattern to use in for example: logging or database connection, Observer pattern for asynchronous calls, Chain of Responsibility pattern which can be used for middleware in NodeJs. However, depending on the problem we might encounter other design patterns can be implemented.

## QA testing & approach

Testing for PF should be essential. Unit testing can include a lot of functionality but I think it is very important to deliver stable products. There are a number of TDD/BDD frameworks which can be used for NodeJs, with Jest, Mocha and Chai among the most popular. These tests should be automated and for BDD we can use headless chrome for testing.

## Other services (CI, code analysis)

As per CI, AWS, Azure, Bitbucket Pipelines or Jenkins can all be used to setup these deployments pipelines. As per code analysis I have only used EsLint, and that can be customized to impose different rules.
