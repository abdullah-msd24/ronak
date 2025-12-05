import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create sample users
    const user1 = await prisma.user.create({
        data: {
            name: 'Ali Khan',
            bio: 'Event enthusiast and traveler.',
            age: 28,
            city: 'Karachi',
            interests: ['Travel', 'Music', 'Food'],
            profilePhoto: 'https://example.com/photo1.jpg',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Sara Ahmed',
            bio: 'Love meeting new people and exploring cultures.',
            age: 25,
            city: 'Lahore',
            interests: ['Art', 'Culture', 'Photography'],
            profilePhoto: 'https://example.com/photo2.jpg',
        },
    });

    // Create sample events
    const event1 = await prisma.event.create({
        data: {
            title: 'Music Concert',
            description: 'Join us for an evening of live music!',
            tags: ['Music', 'Concert'],
            maxParticipants: 100,
            city: 'Karachi',
            hostId: user1.id,
        },
    });

    const event2 = await prisma.event.create({
        data: {
            title: 'Art Exhibition',
            description: 'Explore the latest art from local artists.',
            tags: ['Art', 'Exhibition'],
            maxParticipants: 50,
            city: 'Lahore',
            hostId: user2.id,
        },
    });

    // Create sample communities
    const community1 = await prisma.community.create({
        data: {
            name: 'Travel Lovers',
            description: 'A community for those who love to travel.',
            members: {
                connect: { id: user1.id },
            },
        },
    });

    const community2 = await prisma.community.create({
        data: {
            name: 'Foodies Unite',
            description: 'For all food lovers to share and explore.',
            members: {
                connect: { id: user2.id },
            },
        },
    });

    console.log({ user1, user2, event1, event2, community1, community2 });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });