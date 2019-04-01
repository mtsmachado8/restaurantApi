import request from 'supertest'
import Repository from '../../infra/repositories/repository'
import log from 'winston'

let server;
describe('/api/v1/menuItems', () => {
	let repository;

	afterEach( async() => {
        await server.close();
	});

	describe('GET /', () => {
		beforeEach( async() => { 
            server = await require('../../index'); 
            repository = new Repository();
		});

		const executeGetRequest = (id) => {
			return request(server)
                .get('/api/v1/menu-items/' + (id ? id : ''))
                .send();
		};

		it('Return 200 and all MenuItems', async() => {
			const res = await executeGetRequest();

			expect(res.status).toBe(200);
			expect(res.body).toHaveLength(repository.menuItems.length);
		});
    });
});
