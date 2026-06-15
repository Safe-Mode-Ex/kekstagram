const getIsWithinWorkDay = (workDayStart, workDayEnd, meetingStart, meetingDuration) => {
  const [wrkDayStartHours, workDayStartMinutes] = workDayStart.split(':');
  const [workDayEndHours, workDayEndMinutes] = workDayEnd.split(':');
  const [meetingStartHours, meetingStartMinutes] = meetingStart.split(':');

  const workStartDate = new Date();
  const workEndDate = new Date();
  const meetingStartDate = new Date();
  const meetingEndDate = new Date();

  workStartDate.setHours(wrkDayStartHours, workDayStartMinutes);
  workEndDate.setHours(workDayEndHours, workDayEndMinutes);
  meetingStartDate.setHours(meetingStartHours, meetingStartMinutes);
  meetingEndDate.setHours(meetingStartHours, meetingStartMinutes + meetingDuration);

  return !(meetingStartDate < workStartDate || meetingEndDate > workEndDate);
};

export {getIsWithinWorkDay};
