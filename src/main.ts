import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: [
    //   'http://localhost:3001',
    //   'https://ai-hiring-platform-frontend.vercel.app'
    // ],
    origin: true,
    credentials: true
  })
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('AI Hiring Platform API')
    .setDescription('API documentation for AI Developer Hiring Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
