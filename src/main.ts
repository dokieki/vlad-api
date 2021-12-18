import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import config from './config/configuration';

(async function main() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			logger: true
		})
	);

	app.enableCors();
	
	const docConf = new DocumentBuilder()
	.setTitle('Vlad API')
	.setDescription('Vlad API documentation')
	.setVersion(`v${config.version}`)
	.build();

	const document = SwaggerModule.createDocument(app, docConf);

	SwaggerModule.setup('docs', app, document);

	app.setGlobalPrefix(`v${config.version}`);

	await app.listen(3000, '0.0.0.0');
})();
