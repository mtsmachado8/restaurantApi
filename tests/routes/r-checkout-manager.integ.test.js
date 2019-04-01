import request from 'supertest'
import Repository from '../../infra/repositories/repository'
import Ingredients from '../../model/products/e-ingredients';

let server;
describe('/api/v1/ingredients', () => {
	let repository;

	afterEach(async () => {
		await server.close();
	});

	describe('GET /', () => {
		beforeEach(async () => {
			server = await require('../../index');
			repository = new Repository();
		});

		const executeGetRequest = (id, body) => {
			return request(server)
				.get('/api/v1/checkout/' + (id ? id : ''))
				.send(body);
		};

		it('Return 200 and the final price', async () => {
			let body = {
				menuItems: [
				{
					name: 'X-Burguer',
					ingredients: [
						{
							name: 'Queijo',
						},
						{
							name: 'Bacon'
						},
					]
				},
				{
					name: 'X-Burguer',
					ingredients: [
						{
							name: 'Queijo',
						},
						{
							name: 'Bacon'
						},
					]
				}		
			]
		};

			const res = await executeGetRequest(null, body);

			expect(res.status).toBe(200);
			expect(res.body.price).toEqual(2*(Ingredients.CHEESE.price + Ingredients.BACON.price));
		});
	});
});
