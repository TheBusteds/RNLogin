import { NavigationActions } from 'react-navigation'

export function resetTo(index, navigation) {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: index })]
    })
    navigation.dispatch(resetAction)
}

export function resetToFirst(index, navigation) {
    const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: index })]
    })
    navigation.dispatch(resetAction)
}

export function navigateTo(index, navigation) {
    var touchable = this._touchable;
    navigation.navigate(index);
}