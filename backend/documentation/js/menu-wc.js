'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">quiz-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccessTokenModule.html" data-type="entity-link" >AccessTokenModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AccessTokenModule-26e088ee19fb5601a889691f5bdf725ba4ccc73fd66f304bf44133b98b31d84a69092dee20aa9cff50953cded285c4db118efc0c4db82876afdbbf0cbaa09496"' : 'data-target="#xs-injectables-links-module-AccessTokenModule-26e088ee19fb5601a889691f5bdf725ba4ccc73fd66f304bf44133b98b31d84a69092dee20aa9cff50953cded285c4db118efc0c4db82876afdbbf0cbaa09496"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccessTokenModule-26e088ee19fb5601a889691f5bdf725ba4ccc73fd66f304bf44133b98b31d84a69092dee20aa9cff50953cded285c4db118efc0c4db82876afdbbf0cbaa09496"' :
                                        'id="xs-injectables-links-module-AccessTokenModule-26e088ee19fb5601a889691f5bdf725ba4ccc73fd66f304bf44133b98b31d84a69092dee20aa9cff50953cded285c4db118efc0c4db82876afdbbf0cbaa09496"' }>
                                        <li class="link">
                                            <a href="injectables/AccessTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessTokenService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccessTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccessTokenStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-0ab1ec673975958a42a6d945d756b545eefe328ea76dc83f99f95b0207f40d0a88f5a8d290c63057de67c3eeac527179aa636c619f4783e045de187130ca65fd"' : 'data-target="#xs-controllers-links-module-AuthModule-0ab1ec673975958a42a6d945d756b545eefe328ea76dc83f99f95b0207f40d0a88f5a8d290c63057de67c3eeac527179aa636c619f4783e045de187130ca65fd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0ab1ec673975958a42a6d945d756b545eefe328ea76dc83f99f95b0207f40d0a88f5a8d290c63057de67c3eeac527179aa636c619f4783e045de187130ca65fd"' :
                                            'id="xs-controllers-links-module-AuthModule-0ab1ec673975958a42a6d945d756b545eefe328ea76dc83f99f95b0207f40d0a88f5a8d290c63057de67c3eeac527179aa636c619f4783e045de187130ca65fd"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/GoogleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/OtpController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OtpController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-0ab1ec673975958a42a6d945d756b545eefe328ea76dc83f99f95b0207f40d0a88f5a8d290c63057de67c3eeac527179aa636c619f4783e045de187130ca65fd"' : 'data-target="#xs-injectables-links-module-AuthModule-0ab1ec673975958a42a6d945d756b545eefe328ea76dc83f99f95b0207f40d0a88f5a8d290c63057de67c3eeac527179aa636c619f4783e045de187130ca65fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0ab1ec673975958a42a6d945d756b545eefe328ea76dc83f99f95b0207f40d0a88f5a8d290c63057de67c3eeac527179aa636c619f4783e045de187130ca65fd"' :
                                        'id="xs-injectables-links-module-AuthModule-0ab1ec673975958a42a6d945d756b545eefe328ea76dc83f99f95b0207f40d0a88f5a8d290c63057de67c3eeac527179aa636c619f4783e045de187130ca65fd"' }>
                                        <li class="link">
                                            <a href="injectables/GoogleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExamsModule.html" data-type="entity-link" >ExamsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ExamsModule-2903930c90795226f66e061e274676b03fa1af49379d461f67f990fc2e643d2edf88996e576bb000446e4ec2077904996385b6f7187fbf523c8215b85a77c24b"' : 'data-target="#xs-controllers-links-module-ExamsModule-2903930c90795226f66e061e274676b03fa1af49379d461f67f990fc2e643d2edf88996e576bb000446e4ec2077904996385b6f7187fbf523c8215b85a77c24b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExamsModule-2903930c90795226f66e061e274676b03fa1af49379d461f67f990fc2e643d2edf88996e576bb000446e4ec2077904996385b6f7187fbf523c8215b85a77c24b"' :
                                            'id="xs-controllers-links-module-ExamsModule-2903930c90795226f66e061e274676b03fa1af49379d461f67f990fc2e643d2edf88996e576bb000446e4ec2077904996385b6f7187fbf523c8215b85a77c24b"' }>
                                            <li class="link">
                                                <a href="controllers/ExamsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ExamsModule-2903930c90795226f66e061e274676b03fa1af49379d461f67f990fc2e643d2edf88996e576bb000446e4ec2077904996385b6f7187fbf523c8215b85a77c24b"' : 'data-target="#xs-injectables-links-module-ExamsModule-2903930c90795226f66e061e274676b03fa1af49379d461f67f990fc2e643d2edf88996e576bb000446e4ec2077904996385b6f7187fbf523c8215b85a77c24b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExamsModule-2903930c90795226f66e061e274676b03fa1af49379d461f67f990fc2e643d2edf88996e576bb000446e4ec2077904996385b6f7187fbf523c8215b85a77c24b"' :
                                        'id="xs-injectables-links-module-ExamsModule-2903930c90795226f66e061e274676b03fa1af49379d461f67f990fc2e643d2edf88996e576bb000446e4ec2077904996385b6f7187fbf523c8215b85a77c24b"' }>
                                        <li class="link">
                                            <a href="injectables/ExamsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MailModule-04d68896138577f4ce3fcb9cda09ea47caba64a5eb28184894326600a949edd7c34bc7ac22a1fce8d32017d6bb31ad0725fef9b8f06880ead4089c8500d47d56"' : 'data-target="#xs-injectables-links-module-MailModule-04d68896138577f4ce3fcb9cda09ea47caba64a5eb28184894326600a949edd7c34bc7ac22a1fce8d32017d6bb31ad0725fef9b8f06880ead4089c8500d47d56"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-04d68896138577f4ce3fcb9cda09ea47caba64a5eb28184894326600a949edd7c34bc7ac22a1fce8d32017d6bb31ad0725fef9b8f06880ead4089c8500d47d56"' :
                                        'id="xs-injectables-links-module-MailModule-04d68896138577f4ce3fcb9cda09ea47caba64a5eb28184894326600a949edd7c34bc7ac22a1fce8d32017d6bb31ad0725fef9b8f06880ead4089c8500d47d56"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OtpModule.html" data-type="entity-link" >OtpModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OtpModule-7a8801ed57956b023d94f52c703d46e4b451ab236f8bfb6caced96871a7ed9b278f95661e040d257265dde9985fd80c18368b50ac2324783d7a6abbf919b4d4d"' : 'data-target="#xs-injectables-links-module-OtpModule-7a8801ed57956b023d94f52c703d46e4b451ab236f8bfb6caced96871a7ed9b278f95661e040d257265dde9985fd80c18368b50ac2324783d7a6abbf919b4d4d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OtpModule-7a8801ed57956b023d94f52c703d46e4b451ab236f8bfb6caced96871a7ed9b278f95661e040d257265dde9985fd80c18368b50ac2324783d7a6abbf919b4d4d"' :
                                        'id="xs-injectables-links-module-OtpModule-7a8801ed57956b023d94f52c703d46e4b451ab236f8bfb6caced96871a7ed9b278f95661e040d257265dde9985fd80c18368b50ac2324783d7a6abbf919b4d4d"' }>
                                        <li class="link">
                                            <a href="injectables/OtpService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OtpService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-91daf21c0618a21186c31f0f0152a19770184c9ea290c7f89c760d2a09278478943fe2e5cf12e57efb2ace67b428ec19aac28a2eb752ae4c819a789e5a788052"' : 'data-target="#xs-injectables-links-module-PrismaModule-91daf21c0618a21186c31f0f0152a19770184c9ea290c7f89c760d2a09278478943fe2e5cf12e57efb2ace67b428ec19aac28a2eb752ae4c819a789e5a788052"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-91daf21c0618a21186c31f0f0152a19770184c9ea290c7f89c760d2a09278478943fe2e5cf12e57efb2ace67b428ec19aac28a2eb752ae4c819a789e5a788052"' :
                                        'id="xs-injectables-links-module-PrismaModule-91daf21c0618a21186c31f0f0152a19770184c9ea290c7f89c760d2a09278478943fe2e5cf12e57efb2ace67b428ec19aac28a2eb752ae4c819a789e5a788052"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QuestionsModule.html" data-type="entity-link" >QuestionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-QuestionsModule-66bf8536d8cca8fd5eb82249e3e77f0422a785c219263685342af1b5ac1c49edb0ddab5237d69a298e4a33b5e9e93cd7d915a5b4d0066befe95f83f67f451f34"' : 'data-target="#xs-controllers-links-module-QuestionsModule-66bf8536d8cca8fd5eb82249e3e77f0422a785c219263685342af1b5ac1c49edb0ddab5237d69a298e4a33b5e9e93cd7d915a5b4d0066befe95f83f67f451f34"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-QuestionsModule-66bf8536d8cca8fd5eb82249e3e77f0422a785c219263685342af1b5ac1c49edb0ddab5237d69a298e4a33b5e9e93cd7d915a5b4d0066befe95f83f67f451f34"' :
                                            'id="xs-controllers-links-module-QuestionsModule-66bf8536d8cca8fd5eb82249e3e77f0422a785c219263685342af1b5ac1c49edb0ddab5237d69a298e4a33b5e9e93cd7d915a5b4d0066befe95f83f67f451f34"' }>
                                            <li class="link">
                                                <a href="controllers/QuestionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-QuestionsModule-66bf8536d8cca8fd5eb82249e3e77f0422a785c219263685342af1b5ac1c49edb0ddab5237d69a298e4a33b5e9e93cd7d915a5b4d0066befe95f83f67f451f34"' : 'data-target="#xs-injectables-links-module-QuestionsModule-66bf8536d8cca8fd5eb82249e3e77f0422a785c219263685342af1b5ac1c49edb0ddab5237d69a298e4a33b5e9e93cd7d915a5b4d0066befe95f83f67f451f34"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QuestionsModule-66bf8536d8cca8fd5eb82249e3e77f0422a785c219263685342af1b5ac1c49edb0ddab5237d69a298e4a33b5e9e93cd7d915a5b4d0066befe95f83f67f451f34"' :
                                        'id="xs-injectables-links-module-QuestionsModule-66bf8536d8cca8fd5eb82249e3e77f0422a785c219263685342af1b5ac1c49edb0ddab5237d69a298e4a33b5e9e93cd7d915a5b4d0066befe95f83f67f451f34"' }>
                                        <li class="link">
                                            <a href="injectables/QuestionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuestionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisCacheModule.html" data-type="entity-link" >RedisCacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RedisCacheModule-23dbce90465edaa414e743c5d2ba61981d0dee288f56e1dc48b127402cd84ccae44dffc2d0a8d01a51b78cfbe0cc13bc7decd3f63f0e3131ecce76d6af3b4925"' : 'data-target="#xs-injectables-links-module-RedisCacheModule-23dbce90465edaa414e743c5d2ba61981d0dee288f56e1dc48b127402cd84ccae44dffc2d0a8d01a51b78cfbe0cc13bc7decd3f63f0e3131ecce76d6af3b4925"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisCacheModule-23dbce90465edaa414e743c5d2ba61981d0dee288f56e1dc48b127402cd84ccae44dffc2d0a8d01a51b78cfbe0cc13bc7decd3f63f0e3131ecce76d6af3b4925"' :
                                        'id="xs-injectables-links-module-RedisCacheModule-23dbce90465edaa414e743c5d2ba61981d0dee288f56e1dc48b127402cd84ccae44dffc2d0a8d01a51b78cfbe0cc13bc7decd3f63f0e3131ecce76d6af3b4925"' }>
                                        <li class="link">
                                            <a href="injectables/RedisCacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisCacheService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RefreshTokenModule.html" data-type="entity-link" >RefreshTokenModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RefreshTokenModule-52c614973cba6ef92919a7fcb77e2446cd0d6ecbd14a1ef5895b589bda438817676e40fe6a8ba685df408004bcfc86aeb3ff898d123e56c80bd339f00efbecc3"' : 'data-target="#xs-injectables-links-module-RefreshTokenModule-52c614973cba6ef92919a7fcb77e2446cd0d6ecbd14a1ef5895b589bda438817676e40fe6a8ba685df408004bcfc86aeb3ff898d123e56c80bd339f00efbecc3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RefreshTokenModule-52c614973cba6ef92919a7fcb77e2446cd0d6ecbd14a1ef5895b589bda438817676e40fe6a8ba685df408004bcfc86aeb3ff898d123e56c80bd339f00efbecc3"' :
                                        'id="xs-injectables-links-module-RefreshTokenModule-52c614973cba6ef92919a7fcb77e2446cd0d6ecbd14a1ef5895b589bda438817676e40fe6a8ba685df408004bcfc86aeb3ff898d123e56c80bd339f00efbecc3"' }>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-3134e54f099b915832c426a025fc513cdc56931abd9297fdbf9424308e25a35045f1da5e6e063b497df52d35abc25343464b5c263b9b5562ba22efaaed450399"' : 'data-target="#xs-controllers-links-module-UsersModule-3134e54f099b915832c426a025fc513cdc56931abd9297fdbf9424308e25a35045f1da5e6e063b497df52d35abc25343464b5c263b9b5562ba22efaaed450399"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-3134e54f099b915832c426a025fc513cdc56931abd9297fdbf9424308e25a35045f1da5e6e063b497df52d35abc25343464b5c263b9b5562ba22efaaed450399"' :
                                            'id="xs-controllers-links-module-UsersModule-3134e54f099b915832c426a025fc513cdc56931abd9297fdbf9424308e25a35045f1da5e6e063b497df52d35abc25343464b5c263b9b5562ba22efaaed450399"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-3134e54f099b915832c426a025fc513cdc56931abd9297fdbf9424308e25a35045f1da5e6e063b497df52d35abc25343464b5c263b9b5562ba22efaaed450399"' : 'data-target="#xs-injectables-links-module-UsersModule-3134e54f099b915832c426a025fc513cdc56931abd9297fdbf9424308e25a35045f1da5e6e063b497df52d35abc25343464b5c263b9b5562ba22efaaed450399"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-3134e54f099b915832c426a025fc513cdc56931abd9297fdbf9424308e25a35045f1da5e6e063b497df52d35abc25343464b5c263b9b5562ba22efaaed450399"' :
                                        'id="xs-injectables-links-module-UsersModule-3134e54f099b915832c426a025fc513cdc56931abd9297fdbf9424308e25a35045f1da5e6e063b497df52d35abc25343464b5c263b9b5562ba22efaaed450399"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateExamDto.html" data-type="entity-link" >CreateExamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMultipleChoiceDto.html" data-type="entity-link" >CreateMultipleChoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMultipleSelectDto.html" data-type="entity-link" >CreateMultipleSelectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateQuestionDto.html" data-type="entity-link" >CreateQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateShortAnswerDto.html" data-type="entity-link" >CreateShortAnswerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTrueFalseDto.html" data-type="entity-link" >CreateTrueFalseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CredentailRegister.html" data-type="entity-link" >CredentailRegister</a>
                            </li>
                            <li class="link">
                                <a href="classes/CredentialLogin.html" data-type="entity-link" >CredentialLogin</a>
                            </li>
                            <li class="link">
                                <a href="classes/EntityWithQuestions.html" data-type="entity-link" >EntityWithQuestions</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamEntity.html" data-type="entity-link" >ExamEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/MultipleChoiceEntity.html" data-type="entity-link" >MultipleChoiceEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/MultipleSelectEntity.html" data-type="entity-link" >MultipleSelectEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ParamDto.html" data-type="entity-link" >ParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Payload.html" data-type="entity-link" >Payload</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrismaExceptionFilter.html" data-type="entity-link" >PrismaExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryDeleteDto.html" data-type="entity-link" >QueryDeleteDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryDto.html" data-type="entity-link" >QueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryExamDto.html" data-type="entity-link" >QueryExamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryQuestionDto.html" data-type="entity-link" >QueryQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryUserDto.html" data-type="entity-link" >QueryUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/QuestionEntity.html" data-type="entity-link" >QuestionEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShortAnswerEntity.html" data-type="entity-link" >ShortAnswerEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagEntity.html" data-type="entity-link" >TagEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/TrueFalseEntity.html" data-type="entity-link" >TrueFalseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateExamDto.html" data-type="entity-link" >UpdateExamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMultipleChoiceDto.html" data-type="entity-link" >UpdateMultipleChoiceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMultipleSelectDto.html" data-type="entity-link" >UpdateMultipleSelectDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateQuestionDto.html" data-type="entity-link" >UpdateQuestionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateShortAnswerDto.html" data-type="entity-link" >UpdateShortAnswerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTagDto.html" data-type="entity-link" >UpdateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTrueFalseDto.html" data-type="entity-link" >UpdateTrueFalseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link" >UserEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationErrorDto.html" data-type="entity-link" >ValidationErrorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyEmailDto.html" data-type="entity-link" >VerifyEmailDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleGaurd.html" data-type="entity-link" >GoogleGaurd</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IsGte.html" data-type="entity-link" >IsGte</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IsValidPos.html" data-type="entity-link" >IsValidPos</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LogMiddleware.html" data-type="entity-link" >LogMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenGuard.html" data-type="entity-link" >RefreshTokenGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGaurd.html" data-type="entity-link" >RoleGaurd</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});