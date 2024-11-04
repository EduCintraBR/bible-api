import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';

export const Translation = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const translation = request.params.translation;

    if (!translation) {
      throw new BadRequestException('O parâmetro de tradução está ausente.');
    }

    const validTranslations = ['ARA', 'NVT'];

    if (!validTranslations.includes(translation.toUpperCase())) {
      throw new BadRequestException(
        `Tradução inválida. As traduções válidas são: ${validTranslations.join(', ')}`,
      );
    }

    return translation.toUpperCase();
  },
);