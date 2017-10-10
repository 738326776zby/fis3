// 设置 ignore 文件
fis.set('project.ignore', [ 'package.json', 'fis-conf.js' ]);
// fis 的资源定位就是将
fis.hook('commonjs');

// 1.main/**.js 表示 main 目录下的 所有 js
// 2.main/*.js  表示 main 目录下的所有子孩子

// 将所有 js 使用 mod.js 打包
fis
	.match('**.js', {
		isMod: true,
		useHash: true, // 文件指纹
		optimizer: fis.plugin('uglify-js') // js 压缩
	})
	.match('**.css', {
		optimizer: fis.plugin('clean-css') // css 压缩
	})
	// 不打包common 文件夹下的所有 js
	.match('util/**.js', {
		isMod: false
	})
	// 分析结构解决资源映射问题
	.match('::package', {
		packager: fis.plugin('map'),
		postpackager: fis.plugin('loader', {
			resourceType: 'commonJs',
			useInlineMap: true
		})
	});

// fis 将两个资源合并，两个资源和并后，页面中引入资源的部分会直接加载 合并后的js
fis
	.match('common/common.js', {
		packTo: 'common/index.js'
	})
	.match('common/validate.js', {
		packTo: 'common/index.js'
	})
var allServerConf = '';
fis.match(/^\/[^\/]+\/server\.conf$/, {
	parser: function(content) {
		allServerConf += content + '\n';
		return allServerConf;
	},
	release: '/config/server.conf'
});
