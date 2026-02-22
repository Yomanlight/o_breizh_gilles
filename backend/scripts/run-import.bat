@echo off
set STRAPI_API_TOKEN=a3954d62ca4c60449daf814517c9901355d87c54995a15b3102aa8492227e0b9110abb2a27e089953deee9f6e8a5400f8dae1e1f41851a11e3697fcafa80bb6455123cf30410ce05b828bb5adf010f2c950adb3a99e3ebfe86bc625baf021a102a8b96b8e2816617648523fdbe0ed20e86970b4c1f2cbf93bc98664a43289e0f

echo ========================================
echo Import des cocktails dans Strapi
echo ========================================
echo.
echo Assurez-vous que Strapi est lance sur http://localhost:1337
echo.
pause

node import-cocktails.js

echo.
echo ========================================
echo Import termine !
echo ========================================
pause
