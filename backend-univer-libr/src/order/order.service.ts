import { Injectable } from '@nestjs/common'
import { returnBookObject } from 'src/book/return-book.object'
import { PrismaService } from 'src/prisma.service'
import { OrderDto } from './order.dto'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async getByUserId(userId: number) {
		return this.prisma.order.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
			include: { items: { include: { book: { select: returnBookObject } } } }
		})
	}

	async getAll() {
		return this.prisma.order.findMany({
			orderBy: { createdAt: 'desc' },
			include: { items: { include: { book: { select: returnBookObject } } } }
		})
	}

	async placeOrder(dto: OrderDto, userId: number) {
		const items = dto.items.map(item => ({
			quantity: item.quantity,
			bookId: item.bookId
		}))

		return this.prisma.order.create({
			data: {
				items: {
					create: items
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}
}
