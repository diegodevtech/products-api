import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoles } from './roles/roles';
import * as bcrypt from 'bcrypt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(private prismaService: PrismaService) {}

  async onModuleInit() {
    const customerUser = await this.prismaService.user.findFirst({
      where: {
        email: 'customer@user.com',
      },
    });

    if (!customerUser) {
      await this.prismaService.user.create({
        data: {
          email: 'customer@user.com',
          name: 'Customer User',
          password: bcrypt.hashSync('secret', 10),
          role: UserRoles.Customer,
        },
      });
    }

    const adminUser = await this.prismaService.user.findFirst({
      where: {
        email: 'admin@user.com',
      },
    });

    if (!adminUser) {
      await this.prismaService.user.create({
        data: {
          email: 'admin@user.com',
          name: 'Admin User',
          password: await bcrypt.hash('secret', 10),
          role: UserRoles.Admin,
        },
      });
    }
  }
}
