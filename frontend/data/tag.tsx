export const Tag: tagColor[] = [
  {
    tag: 'Claim',
    color: 'warning',
  },
  {
    tag: 'Method',
    color: 'info',
  },
  {
    tag: 'Result',
    color: 'primary',
  },
  {
    tag: 'Conclusion',
    color: 'success',
  },
  {
    tag: 'Method/Result',
    color: 'accent',
  },
  {
    tag: 'Other',
    color: 'neutral',
  },
  {
    tag: 'Wrong extraction',
    color: 'error',
  },
];

export interface tagColor {
  tag: string;
  color: string;
}
