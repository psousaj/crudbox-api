import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ZodValidationPipe } from "nestjs-zod";
import { ZodFilter } from "@helpers/filters/zod.exception";
import { EnvService } from "./helpers/env/env.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  )

  const configService = app.get(EnvService);

  const config = new DocumentBuilder()
    .setTitle("Crudbox-Api")
    .setDescription(
      "Especificações da API para o back-end da aplicação crubox",
    )
    .setVersion("1.0.0")
    // .addTag("links")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.useGlobalPipes(new ZodValidationPipe())
  app.useGlobalFilters(new ZodFilter())

  if (configService.get("NODE_ENV") !== "development") {
    // app.enableCors();
    app.setGlobalPrefix('api/v1');
  }

  await app.listen(configService.get("PORT"), "0.0.0.0");
}
bootstrap();
