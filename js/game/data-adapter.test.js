import {assert} from 'chai';
import adaptServerData from './data-adapter';
import resize from './resize';
import {ImageFrame} from '../data/config';

describe(`Adapt server data`, () => {
	const serverData = [
		{
			type: `one-of-three`,
			question: `Найдите рисунок среди изображений`,
			answers: [
				{
					image: {
						url: `http://placehold.it/304x455`,
						width: 800,
						height: 600
					},
					type: `photo`
				},
				{
					image: {
						url: `http://placehold.it/304x455`,
						width: 800,
						height: 600
					},
					type: `painting`
				},
				{
					image: {
						url: `http://placehold.it/304x455`,
						width: 800,
						height: 600
					},
					type: `photo`
				}
			]
		},
		{
			type: `two-of-two`,
			question: `Угадайте для каждого изображения фото или рисунок?`,
			answers: [
				{
					image: {
						url: `http://placehold.it/468x458`,
						width: 800,
						height: 600
					},
					type: `photo`
				},
				{
					image: {
						url: `http://placehold.it/468x458`,
						width: 800,
						height: 600
					},
					type: `painting`
				}
			]
		},
	];

	const firstResizeMock = resize(ImageFrame[serverData[0].type], {width: 800, height: 600});
	const secondResizeMock = resize(ImageFrame[serverData[1].type], {width: 800, height: 600});

	const localData = [
		{
			type: `one-of-three`,
			question: `Найдите рисунок среди изображений`,
			answers: [
				{
					image: {
						url: `http://placehold.it/304x455`,
						width: firstResizeMock.width,
						height: firstResizeMock.height
					},
					type: `photo`
				},
				{
					image: {
						url: `http://placehold.it/304x455`,
						width: firstResizeMock.width,
						height: firstResizeMock.height
					},
					type: `paint`
				},
				{
					image: {
						url: `http://placehold.it/304x455`,
						width: firstResizeMock.width,
						height: firstResizeMock.height
					},
					type: `photo`
				}
			]
		},
		{
			type: `two-of-two`,
			question: `Угадайте для каждого изображения фото или рисунок?`,
			answers: [
				{
					image: {
						url: `http://placehold.it/468x458`,
						width: secondResizeMock.width,
						height: secondResizeMock.height
					},
					type: `photo`
				},
				{
					image: {
						url: `http://placehold.it/468x458`,
						width: secondResizeMock.width,
						height: secondResizeMock.height
					},
					type: `paint`
				}
			]
		},
	];

	it(`should have several format remote and local data`, () => {
		assert.deepEqual(adaptServerData(serverData), localData);
	});
});
