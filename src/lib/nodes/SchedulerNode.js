import cron from 'node-cron';

const schedules = new Map();

export function validateSchedule(config) {
    const { scheduleType, intervalValue, intervalUnit, cronExpression, specificDate, specificTime } = config;

    switch (scheduleType) {
        case 'interval':
            if (!intervalValue || !intervalUnit) {
                throw new Error('Interval value and unit are required');
            }
            if (intervalValue <= 0) {
                throw new Error('Interval value must be positive');
            }
            break;

        case 'cron':
            if (!cronExpression) {
                throw new Error('Cron expression is required');
            }
            if (!cron.validate(cronExpression)) {
                throw new Error('Invalid cron expression');
            }
            break;

        case 'specific':
            if (!specificDate || !specificTime) {
                throw new Error('Date and time are required');
            }
            const scheduledTime = new Date(`${specificDate}T${specificTime}`);
            if (scheduledTime <= new Date()) {
                throw new Error('Scheduled time must be in the future');
            }
            break;

        default:
            throw new Error('Invalid schedule type');
    }
}

export function scheduleWorkflow(workflowId, config, executeCallback) {
    // Cancel existing schedule if any
    cancelSchedule(workflowId);

    const { scheduleType, intervalValue, intervalUnit, cronExpression, specificDate, specificTime } = config;
    let schedule;

    switch (scheduleType) {
        case 'interval':
            const intervalMs = getIntervalMs(intervalValue, intervalUnit);
            schedule = setInterval(executeCallback, intervalMs);
            break;

        case 'cron':
            schedule = cron.schedule(cronExpression, executeCallback);
            break;

        case 'specific':
            const scheduledTime = new Date(`${specificDate}T${specificTime}`);
            const delay = scheduledTime.getTime() - Date.now();
            schedule = setTimeout(executeCallback, delay);
            break;
    }

    schedules.set(workflowId, { type: scheduleType, schedule });
    return true;
}

export function cancelSchedule(workflowId) {
    const existing = schedules.get(workflowId);
    if (existing) {
        switch (existing.type) {
            case 'interval':
                clearInterval(existing.schedule);
                break;
            case 'cron':
                existing.schedule.stop();
                break;
            case 'specific':
                clearTimeout(existing.schedule);
                break;
        }
        schedules.delete(workflowId);
    }
}

function getIntervalMs(value, unit) {
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    switch (unit) {
        case 'minutes':
            return value * minute;
        case 'hours':
            return value * hour;
        case 'days':
            return value * day;
        default:
            throw new Error('Invalid interval unit');
    }
}
