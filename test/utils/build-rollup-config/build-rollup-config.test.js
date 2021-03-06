import assert from 'assert';
import path from 'path';
import buildRollupConfig from '../../../src/utils/build-rollup-config';

describe('utils/build-rollup-config', () => {
	it('Should be exported as function', () => {
		assert(typeof buildRollupConfig === 'function');
	});

	it('Should return correct config if passed passed correct base config', () => {
		let baseConfig = {
			input: './app.js',
			output: './app.bundle.js',
			context: '/test/context'
		};

		let result = buildRollupConfig(baseConfig);

		assert(result.input.input === path.resolve(baseConfig.context, baseConfig.input));
		assert(result.output.file === path.resolve(baseConfig.context, baseConfig.output));
		assert(result.output.name === 'window');

		baseConfig.name = 'BX.Test';

		result = buildRollupConfig(baseConfig);

		assert(result.output.name === 'BX.Test');
	});
});