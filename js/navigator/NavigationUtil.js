/*
全局导航跳转工具类
*/

import { NavigationActions, StackActions} from 'react-navigation';

export default class NavigationUtil{
    /**
     * 跳转到指定页面
     * @param params 要传的参数
     * @param page 要跳转的页面名
     */
    static goToPageWithName(params,page) {
        const navigation = NavigationUtil.navigation;
        if (!navigation) {
            console.log("NavigationUtil.navigation 为空");
            return;
        }
        navigation.navigate(page,{...params});
    };

    /**
     * 返回上一页
     * @param navigation
     */
    static goToBack(navigation) {
        navigation.goBack();
    };

    /**
     * 回到首页
     * @param params
     */
    static restToHomePage(params) {
        const {navigation} = params;
        navigation.navigate("Main");
    };
    /**
     * 回到根页面
     * @param params
     */
    static restToRootPage(params) {
        const { navigation } = params;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate("HomePage")]
        })
        navigation.dispatch(resetAction);
    };
}