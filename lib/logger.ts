/**
 * Client-side Logger Utility
 * 
 * Provides structured logging with different log levels, formatting, and
 * optional console styling for better debugging experience.
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LogConfig {
  level: LogLevel;
  enableTimestamp: boolean;
  enableColors: boolean;
  prefix: string;
}

class Logger {
  private config: LogConfig;

  constructor(config: Partial<LogConfig> = {}) {
    this.config = {
      level: process.env.NODE_ENV === 'production' ? LogLevel.ERROR : LogLevel.DEBUG,
      enableTimestamp: true,
      enableColors: true,
      prefix: '[SneakersHub]',
      ...config,
    };
  }

  private formatMessage(level: string, message: string, ...args: unknown[]): string {
    const timestamp = this.config.enableTimestamp
      ? new Date().toISOString()
      : '';
    
    const parts = [
      this.config.prefix,
      timestamp,
      `[${level}]`,
      message,
    ].filter(Boolean);

    return parts.join(' ');
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private getStyle(level: LogLevel): string {
    if (!this.config.enableColors) return '';
    
    const styles: Record<LogLevel, string> = {
      [LogLevel.DEBUG]: 'color: #9CA3AF; font-weight: normal',
      [LogLevel.INFO]: 'color: #3B82F6; font-weight: normal',
      [LogLevel.WARN]: 'color: #F59E0B; font-weight: bold',
      [LogLevel.ERROR]: 'color: #F43F5E; font-weight: bold',
      [LogLevel.NONE]: '',
    };
    
    return styles[level] || '';
  }

  debug(message: string, ...args: unknown[]): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;
    
    const formatted = this.formatMessage('DEBUG', message);
    const style = this.getStyle(LogLevel.DEBUG);
    
    if (style && args.length === 0) {
      console.log(`%c${formatted}`, style, ...args);
    } else {
      console.log(formatted, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (!this.shouldLog(LogLevel.INFO)) return;
    
    const formatted = this.formatMessage('INFO', message);
    const style = this.getStyle(LogLevel.INFO);
    
    if (style && args.length === 0) {
      console.log(`%c${formatted}`, style, ...args);
    } else {
      console.log(formatted, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    if (!this.shouldLog(LogLevel.WARN)) return;
    
    const formatted = this.formatMessage('WARN', message);
    const style = this.getStyle(LogLevel.WARN);
    
    if (style && args.length === 0) {
      console.warn(`%c${formatted}`, style, ...args);
    } else {
      console.warn(formatted, ...args);
    }
  }

  error(message: string, error?: Error | unknown, ...args: unknown[]): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;
    
    const formatted = this.formatMessage('ERROR', message);
    const style = this.getStyle(LogLevel.ERROR);
    
    if (error instanceof Error) {
      if (style && args.length === 0) {
        console.error(`%c${formatted}`, style, error, ...args);
      } else {
        console.error(formatted, error, ...args);
      }
      
      // Log stack trace if available
      if (error.stack) {
        console.error('Stack trace:', error.stack);
      }
    } else {
      if (style && args.length === 0) {
        console.error(`%c${formatted}`, style, error, ...args);
      } else {
        console.error(formatted, error, ...args);
      }
    }
  }

  /**
   * Group related logs together
   */
  group(label: string, collapsed = false): void {
    if (collapsed) {
      console.groupCollapsed(label);
    } else {
      console.group(label);
    }
  }

  groupEnd(): void {
    console.groupEnd();
  }

  /**
   * Log performance timing
   */
  time(label: string): void {
    console.time(label);
  }

  timeEnd(label: string): void {
    console.timeEnd(label);
  }

  /**
   * Create a scoped logger with a specific prefix
   */
  scope(prefix: string): Logger {
    return new Logger({
      ...this.config,
      prefix: `${this.config.prefix} [${prefix}]`,
    });
  }

  /**
   * Update log level at runtime
   */
  setLevel(level: LogLevel): void {
    this.config.level = level;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for creating custom loggers
export default Logger;

