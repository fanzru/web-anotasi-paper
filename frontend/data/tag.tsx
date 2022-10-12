export const Tag: tagColor[] = [
  {
    tag: 'Claim',
    color: 'badge-warning',
  },
  {
    tag: 'Method',
    color: 'badge-info',
  },
  {
    tag: 'Result',
    color: 'badge-primary',
  },
  {
    tag: 'Conclusion',
    color: 'badge-success',
  },
  {
    tag: 'Method/Result',
    color: 'badge-accent',
  },
  {
    tag: 'Other',
    color: 'badge-neutral',
  },
  {
    tag: 'Wrong extraction',
    color: 'badge-error',
  },
];

export interface tagColor {
  tag: string;
  color: string;
}
