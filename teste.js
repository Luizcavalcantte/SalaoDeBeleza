<TouchableOpacity
  style={[
    styles.week,
    {
      backgroundColor: day.number == selectedDay ? '#2196F3' : '#cb8fdd',
    },
  ]}
  key={key}
  onPress={() => {
    setSelectedDay(day.number);
    setSelectedHour('');
  }}>
  <Text style={styles.weekText}>{day.weekDay.substring(0, 3)}</Text>
  <Text style={styles.weekText}>{day.number}</Text>
</TouchableOpacity>;
