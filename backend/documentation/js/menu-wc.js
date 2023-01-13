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
                                        'data-target="#injectables-links-module-AccessTokenModule-79bf197cc58e9dc07a0bddf2908c2285466eb21ed1a86683f59ed07aef7bb4ba104c60790aee4b67e6b5ae99d75106c05a8bea0103902bbb96c34d792667d0e6"' : 'data-target="#xs-injectables-links-module-AccessTokenModule-79bf197cc58e9dc07a0bddf2908c2285466eb21ed1a86683f59ed07aef7bb4ba104c60790aee4b67e6b5ae99d75106c05a8bea0103902bbb96c34d792667d0e6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AccessTokenModule-79bf197cc58e9dc07a0bddf2908c2285466eb21ed1a86683f59ed07aef7bb4ba104c60790aee4b67e6b5ae99d75106c05a8bea0103902bbb96c34d792667d0e6"' :
                                        'id="xs-injectables-links-module-AccessTokenModule-79bf197cc58e9dc07a0bddf2908c2285466eb21ed1a86683f59ed07aef7bb4ba104c60790aee4b67e6b5ae99d75106c05a8bea0103902bbb96c34d792667d0e6"' }>
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
                                            'data-target="#controllers-links-module-AuthModule-a39a9b711db7654090cd0ec52fc8ad5f0753def7d99b1ae607510c7f2457b41757bd0f959d1a6eb5de6c1e6b0749c5778ff341c60ce4f5114ae166951897a377"' : 'data-target="#xs-controllers-links-module-AuthModule-a39a9b711db7654090cd0ec52fc8ad5f0753def7d99b1ae607510c7f2457b41757bd0f959d1a6eb5de6c1e6b0749c5778ff341c60ce4f5114ae166951897a377"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a39a9b711db7654090cd0ec52fc8ad5f0753def7d99b1ae607510c7f2457b41757bd0f959d1a6eb5de6c1e6b0749c5778ff341c60ce4f5114ae166951897a377"' :
                                            'id="xs-controllers-links-module-AuthModule-a39a9b711db7654090cd0ec52fc8ad5f0753def7d99b1ae607510c7f2457b41757bd0f959d1a6eb5de6c1e6b0749c5778ff341c60ce4f5114ae166951897a377"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MailModule-34b1da8bc6be02eb5cc3942705b9f33b8e95a20632a76edaf4ee4bcf855ee57ef2bddc0c275c17614597ea01b01dad8d0b4aac15f05028afe21a54184cd5ae7f"' : 'data-target="#xs-injectables-links-module-MailModule-34b1da8bc6be02eb5cc3942705b9f33b8e95a20632a76edaf4ee4bcf855ee57ef2bddc0c275c17614597ea01b01dad8d0b4aac15f05028afe21a54184cd5ae7f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-34b1da8bc6be02eb5cc3942705b9f33b8e95a20632a76edaf4ee4bcf855ee57ef2bddc0c275c17614597ea01b01dad8d0b4aac15f05028afe21a54184cd5ae7f"' :
                                        'id="xs-injectables-links-module-MailModule-34b1da8bc6be02eb5cc3942705b9f33b8e95a20632a76edaf4ee4bcf855ee57ef2bddc0c275c17614597ea01b01dad8d0b4aac15f05028afe21a54184cd5ae7f"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
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
                                <a href="modules/RefreshTokenModule.html" data-type="entity-link" >RefreshTokenModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RefreshTokenModule-ffbafd17a838f341c75233835eddb33a6abf60acfcfe741c92f59c29f87542c9ef554f1000b865545aec00998684e8aa9fcb0e8801bd034f48e757b2c627c832"' : 'data-target="#xs-injectables-links-module-RefreshTokenModule-ffbafd17a838f341c75233835eddb33a6abf60acfcfe741c92f59c29f87542c9ef554f1000b865545aec00998684e8aa9fcb0e8801bd034f48e757b2c627c832"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RefreshTokenModule-ffbafd17a838f341c75233835eddb33a6abf60acfcfe741c92f59c29f87542c9ef554f1000b865545aec00998684e8aa9fcb0e8801bd034f48e757b2c627c832"' :
                                        'id="xs-injectables-links-module-RefreshTokenModule-ffbafd17a838f341c75233835eddb33a6abf60acfcfe741c92f59c29f87542c9ef554f1000b865545aec00998684e8aa9fcb0e8801bd034f48e757b2c627c832"' }>
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
                                            'data-target="#controllers-links-module-UsersModule-22ccfc56f678fcf4fdc86caacbd28df5d0d47bedb4a12bb3b1f9188e8e1c256407efb3cf607097b6e830c911c2590fa6512db2457768d5fd4795496fec40a0b4"' : 'data-target="#xs-controllers-links-module-UsersModule-22ccfc56f678fcf4fdc86caacbd28df5d0d47bedb4a12bb3b1f9188e8e1c256407efb3cf607097b6e830c911c2590fa6512db2457768d5fd4795496fec40a0b4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-22ccfc56f678fcf4fdc86caacbd28df5d0d47bedb4a12bb3b1f9188e8e1c256407efb3cf607097b6e830c911c2590fa6512db2457768d5fd4795496fec40a0b4"' :
                                            'id="xs-controllers-links-module-UsersModule-22ccfc56f678fcf4fdc86caacbd28df5d0d47bedb4a12bb3b1f9188e8e1c256407efb3cf607097b6e830c911c2590fa6512db2457768d5fd4795496fec40a0b4"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-22ccfc56f678fcf4fdc86caacbd28df5d0d47bedb4a12bb3b1f9188e8e1c256407efb3cf607097b6e830c911c2590fa6512db2457768d5fd4795496fec40a0b4"' : 'data-target="#xs-injectables-links-module-UsersModule-22ccfc56f678fcf4fdc86caacbd28df5d0d47bedb4a12bb3b1f9188e8e1c256407efb3cf607097b6e830c911c2590fa6512db2457768d5fd4795496fec40a0b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-22ccfc56f678fcf4fdc86caacbd28df5d0d47bedb4a12bb3b1f9188e8e1c256407efb3cf607097b6e830c911c2590fa6512db2457768d5fd4795496fec40a0b4"' :
                                        'id="xs-injectables-links-module-UsersModule-22ccfc56f678fcf4fdc86caacbd28df5d0d47bedb4a12bb3b1f9188e8e1c256407efb3cf607097b6e830c911c2590fa6512db2457768d5fd4795496fec40a0b4"' }>
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
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CredentialLogin.html" data-type="entity-link" >CredentialLogin</a>
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
                                <a href="classes/QueryDto.html" data-type="entity-link" >QueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
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