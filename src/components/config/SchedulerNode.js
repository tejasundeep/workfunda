import React from 'react';
import ConfigField from '../common/ConfigField';

export default function SchedulerNode({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const scheduleTypeOptions = [
    { value: 'cron', label: 'Cron Expression' },
    { value: 'interval', label: 'Time Interval' },
    { value: 'fixed', label: 'Fixed Time' },
    { value: 'calendar', label: 'Calendar' }
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'America/New_York' },
    { value: 'Europe/London', label: 'Europe/London' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney' }
  ];

  const intervalUnitOptions = [
    { value: 'milliseconds', label: 'Milliseconds' },
    { value: 'seconds', label: 'Seconds' },
    { value: 'minutes', label: 'Minutes' },
    { value: 'hours', label: 'Hours' },
    { value: 'days', label: 'Days' }
  ];

  const weekdayOptions = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  return (
    <div>
      <ConfigField
        label="Schedule Type"
        type="select"
        field="scheduleType"
        value={data.config?.scheduleType}
        onChange={handleChange}
        options={scheduleTypeOptions}
        required
      />

      {data.config?.scheduleType === 'cron' && (
        <>
          <ConfigField
            label="Cron Expression"
            type="text"
            field="cronExpression"
            value={data.config?.cronExpression}
            onChange={handleChange}
            placeholder="* * * * *"
            required
          />
          <ConfigField
            label="Timezone"
            type="select"
            field="timezone"
            value={data.config?.timezone}
            onChange={handleChange}
            options={timezoneOptions}
            required
          />
        </>
      )}

      {data.config?.scheduleType === 'interval' && (
        <>
          <ConfigField
            label="Interval Value"
            type="number"
            field="intervalValue"
            value={data.config?.intervalValue}
            onChange={handleChange}
            min={1}
            validation="number"
            required
          />
          <ConfigField
            label="Interval Unit"
            type="select"
            field="intervalUnit"
            value={data.config?.intervalUnit}
            onChange={handleChange}
            options={intervalUnitOptions}
            required
          />
        </>
      )}

      {data.config?.scheduleType === 'fixed' && (
        <>
          <ConfigField
            label="Start Time"
            type="text"
            field="startTime"
            value={data.config?.startTime}
            onChange={handleChange}
            placeholder="HH:mm:ss"
            required
          />
          <ConfigField
            label="End Time"
            type="text"
            field="endTime"
            value={data.config?.endTime}
            onChange={handleChange}
            placeholder="HH:mm:ss"
          />
          <ConfigField
            label="Timezone"
            type="select"
            field="timezone"
            value={data.config?.timezone}
            onChange={handleChange}
            options={timezoneOptions}
            required
          />
        </>
      )}

      {data.config?.scheduleType === 'calendar' && (
        <>
          <ConfigField
            label="Weekdays"
            type="select"
            field="weekdays"
            value={data.config?.weekdays}
            onChange={handleChange}
            options={weekdayOptions}
            multiple
            required
          />
          <ConfigField
            label="Start Time"
            type="text"
            field="startTime"
            value={data.config?.startTime}
            onChange={handleChange}
            placeholder="HH:mm:ss"
            required
          />
          <ConfigField
            label="End Time"
            type="text"
            field="endTime"
            value={data.config?.endTime}
            onChange={handleChange}
            placeholder="HH:mm:ss"
            required
          />
          <ConfigField
            label="Timezone"
            type="select"
            field="timezone"
            value={data.config?.timezone}
            onChange={handleChange}
            options={timezoneOptions}
            required
          />
          <ConfigField
            label="Exclude Holidays"
            type="checkbox"
            field="excludeHolidays"
            value={data.config?.excludeHolidays}
            onChange={handleChange}
          />
        </>
      )}

      <ConfigField
        label="Start Date"
        type="text"
        field="startDate"
        value={data.config?.startDate}
        onChange={handleChange}
        placeholder="YYYY-MM-DD"
      />

      <ConfigField
        label="End Date"
        type="text"
        field="endDate"
        value={data.config?.endDate}
        onChange={handleChange}
        placeholder="YYYY-MM-DD"
      />

      <ConfigField
        label="Maximum Runs"
        type="number"
        field="maxRuns"
        value={data.config?.maxRuns}
        onChange={handleChange}
        min={0}
        validation="number"
      />

      <ConfigField
        label="Overlap Policy"
        type="select"
        field="overlapPolicy"
        value={data.config?.overlapPolicy}
        onChange={handleChange}
        options={[
          { value: 'allow', label: 'Allow Overlap' },
          { value: 'skip', label: 'Skip if Running' },
          { value: 'cancel', label: 'Cancel Previous' }
        ]}
        required
      />

      <ConfigField
        label="Retry on Failure"
        type="checkbox"
        field="retryOnFailure"
        value={data.config?.retryOnFailure}
        onChange={handleChange}
      />

      {data.config?.retryOnFailure && (
        <>
          <ConfigField
            label="Retry Count"
            type="number"
            field="retryCount"
            value={data.config?.retryCount}
            onChange={handleChange}
            min={1}
            max={5}
            validation="number"
          />
          <ConfigField
            label="Retry Delay (ms)"
            type="number"
            field="retryDelay"
            value={data.config?.retryDelay}
            onChange={handleChange}
            min={0}
            max={60000}
            validation="number"
          />
        </>
      )}

      <ConfigField
        label="Error Handling"
        type="select"
        field="errorHandling"
        value={data.config?.errorHandling}
        onChange={handleChange}
        options={[
          { value: 'continue', label: 'Continue Schedule' },
          { value: 'pause', label: 'Pause Schedule' },
          { value: 'stop', label: 'Stop Schedule' }
        ]}
      />

      <ConfigField
        label="Description"
        type="textarea"
        field="description"
        value={data.config?.description}
        onChange={handleChange}
        placeholder="Describe the purpose of this schedule"
        rows={2}
      />
    </div>
  );
}
