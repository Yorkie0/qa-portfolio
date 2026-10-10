import { test, expect } from '@playwright/test';

const booking = {
  firstname: 'Test',
  lastname: 'User',
  totalprice: 100,
  depositpaid: true,
  bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
  additionalneeds: 'Breakfast',
};

test.describe('Booking API', () => {
  test('creates a booking and returns it by id', async ({ request }) => {
    const created = await request.post('/booking', { data: booking });
    expect(created.ok()).toBeTruthy();
    const { bookingid } = await created.json();

    const fetched = await request.get(`/booking/${bookingid}`);
    expect(fetched.status()).toBe(200);
    expect(await fetched.json()).toMatchObject(booking);
  });

  test('returns 404 for a booking that does not exist', async ({ request }) => {
    const response = await request.get('/booking/999999999');
    expect(response.status()).toBe(404);
  });

  test('booking list is returned as an array of ids', async ({ request }) => {
    const response = await request.get('/booking');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body[0]).toHaveProperty('bookingid');
  });
});
