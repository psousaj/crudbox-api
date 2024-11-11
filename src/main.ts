import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ZodFilter } from "@/common/filters/zod.exception";
import { EnvService } from "@/common/env/env.service";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  );

  const configService = app.get(EnvService);

  const config = new DocumentBuilder()
    .setTitle("Crudbox-Api")
    .setDescription("Especificações da API para o back-end da aplicação crubox")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.useGlobalFilters(new ZodFilter());
  // app.useGlobalPipes(new ValidationPipe())

  if (configService.get("NODE_ENV") !== "development") {
    app.setGlobalPrefix('api/v1');
  }

  await app.listen(3333, "0.0.0.0");
}
bootstrap();
