import { Text as T, TextProps, View } from 'react-native';
import {
	Icon as I,
	IconProps as TablerIconProps,
} from '@tabler/icons-react-native';
import { colors, fontSize } from '@/theme';
import { styles } from './styles';

interface IconProps {
	icon: React.ComponentType<TablerIconProps>;
}

interface IconWithTextProps {
	children: React.ReactNode;
}

function Icon({ icon: Icon }: IconProps) {
	return <Icon size={fontSize.lg} color={colors.blue} />;
}

function Text({ children, style, ...rest }: TextProps) {
	return <T style={styles.text} {...rest}>{children}</T>;
}

function IconWithText({ children }: IconWithTextProps) {
	return <View style={styles.container}>{children}</View>;
}

IconWithText.Icon = Icon;
IconWithText.Text = Text;

export { IconWithText };
