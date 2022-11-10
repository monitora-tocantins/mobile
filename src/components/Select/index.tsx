import React, { Fragment, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Divider, Menu, TextInput, TextInputProps } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ISelectProps extends TextInputProps {
  items: {
    id: string;
    value: string;
    label: string;
  }[];
  onSelect: (value: string) => void;
}

const Select: React.FC<ISelectProps> = ({ items, onSelect, ...rest }) => {
  const [visible, setVisible] = useState(false);
  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const onLayout = (event: any) => {
    setInputLayout(event.nativeEvent.layout);
  };

  return (
    <>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{
          maxWidth: inputLayout?.width,
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
        }}
        anchor={
          <TouchableOpacity onPress={() => openMenu()} onLayout={onLayout}>
            <View pointerEvents="none">
              <TextInput
                editable={false}
                right={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons
                        name={!visible ? 'arrow-drop-down' : 'arrow-drop-up'}
                        size={24}
                        color="#000"
                      />
                    )}
                  />
                }
                {...rest}
              />
            </View>
          </TouchableOpacity>
        }>
        {items.map(item => (
          <Fragment key={item.id}>
            <Menu.Item
              key={item.id}
              title={item.label}
              style={{
                maxWidth: inputLayout?.width,
                width: inputLayout?.width,
              }}
              onPress={() => {
                onSelect(item.value);
                closeMenu();
              }}
            />
            <Divider />
          </Fragment>
        ))}
      </Menu>
    </>
  );
};

export default Select;
