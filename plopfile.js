module.exports = function (plop) {
    plop.setActionType('mkdir', function (answers, config, plop) {});
    plop.setGenerator('feature', {
        description: 'container & presentational views and style and index',
        prompts: [{
            type: 'input',
            name: 'name',
        }],
        actions: [
            {
                type: 'mkdir',
                path: 'src/views/{{pascalCase name}}',
            },
            {
                type: 'add',
                path: 'src/views/{{pascalCase name}}/index.js',
                templateFile: 'plop-templates/feature/index.hbs',
            },
            {
                type: 'add',
                path: 'src/views/{{pascalCase name}}/{{pascalCase name}}Container.js',
                templateFile: 'plop-templates/feature/container.hbs',
            },
            {
                type: 'add',
                path: 'src/views/{{pascalCase name}}/{{pascalCase name}}Presentation.js',
                templateFile: 'plop-templates/feature/presentation.hbs',
            },
            {
                type: 'add',
                path: 'src/views/{{pascalCase name}}/{{pascalCase name}}Presentation.scss',
            },
        ]
    });
    plop.setGenerator('component', {
        description: 'component, style, and index',
        prompts: [{
            type: 'input',
            name: 'name',
        }],
        actions: [
            {
                type: 'mkdir',
                path: 'src/common/components/{{pascalCase name}}',
            },
            {
                type: 'add',
                path: 'src/common/components/{{pascalCase name}}/index.js',
                templateFile: 'plop-templates/component/index.hbs',
            },
            {
                type: 'add',
                path: 'src/common/components/{{pascalCase name}}/{{pascalCase name}}.js',
                templateFile: 'plop-templates/component/component.hbs',
            },
            {
                type: 'add',
                path: 'src/common/components/{{pascalCase name}}/{{pascalCase name}}.scss',
            },
        ]
    });
};
