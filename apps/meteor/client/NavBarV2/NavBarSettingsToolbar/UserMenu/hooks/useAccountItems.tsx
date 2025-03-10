import { Badge } from '@rocket.chat/fuselage';
import { useEffectEvent } from '@rocket.chat/fuselage-hooks';
import { defaultFeaturesPreview, useFeaturePreviewList } from '@rocket.chat/ui-client';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useRouter, useTranslation } from '@rocket.chat/ui-contexts';
import React from 'react';

export const useAccountItems = (): GenericMenuItemProps[] => {
	const t = useTranslation();
	const router = useRouter();

	const { unseenFeatures, featurePreviewEnabled } = useFeaturePreviewList();

	const handleMyAccount = useEffectEvent(() => {
		router.navigate('/account');
	});
	const handlePreferences = useEffectEvent(() => {
		router.navigate('/account/preferences');
	});
	const handleFeaturePreview = useEffectEvent(() => {
		router.navigate('/account/feature-preview');
	});
	const handleAccessibility = useEffectEvent(() => {
		router.navigate('/account/accessibility-and-appearance');
	});

	const featurePreviewItem = {
		id: 'feature-preview',
		icon: 'flask' as const,
		content: t('Feature_preview'),
		onClick: handleFeaturePreview,
		...(unseenFeatures > 0 && {
			addon: (
				<Badge variant='primary' aria-label={t('Unseen_features')}>
					{unseenFeatures}
				</Badge>
			),
		}),
	};

	return [
		{
			id: 'profile',
			icon: 'user',
			content: t('Profile'),
			onClick: handleMyAccount,
		},
		{
			id: 'preferences',
			icon: 'customize',
			content: t('Preferences'),
			onClick: handlePreferences,
		},
		{
			id: 'accessibility',
			icon: 'person-arms-spread',
			content: t('Accessibility_and_Appearance'),
			onClick: handleAccessibility,
		},
		...(featurePreviewEnabled && defaultFeaturesPreview.length > 0 ? [featurePreviewItem] : []),
	];
};
