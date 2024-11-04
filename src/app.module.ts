import { Module } from '@nestjs/common';
import { BibleModule } from './bible/bible.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BibleModule,
    AuthModule
  ],
})

export class AppModule {}
